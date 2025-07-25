{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.astal.follows = "astal";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
      astal,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      # Define astal packages in one place.
      # Removed the duplicate 'tray' entry.
      astalPackages = with astal.packages.${system}; [
        battery
        network
        mpris
        notifd
        cava
        apps
        hyprland
        tray
        bluetooth
        io
      ];

      # Define the package derivation so we can reuse its attributes.
      my-ags-bar = pkgs.stdenv.mkDerivation {
        pname = "my-ags-bar";
        version = "1.0";

        src = ./.;

        # nativeBuildInputs are for tools needed to build the package.
        nativeBuildInputs = with pkgs; [
          wrapGAppsHook
          gobject-introspection
          ags.packages.${system}.default # The 'ags' command-line tool
        ];

        # buildInputs are for libraries and dependencies needed at runtime or for linking.
        buildInputs = [
          pkgs.glib
          pkgs.gjs
        ]
        ++ astalPackages; # The astal packages are runtime dependencies.

        # This command bundles your TypeScript into a runnable script.
        installPhase = ''
          mkdir -p $out/bin
          ags bundle app.tsx --gtk 4 --out $out/bin/my-ags-bar
        '';

        # This hook wraps the final script, adding runtime dependencies to its PATH.
        preFixup = ''
          gappsWrapperArgs+=(
            --prefix PATH : ${
              # This makes the astal executables (battery, network, etc.)
              # available to your ags bar at runtime.
              pkgs.lib.makeBinPath astalPackages
            }
          )
        '';
      };

    in
    {
      # The output that builds your final application.
      # You can build it with `nix build .`
      packages.${system}.default = my-ags-bar;

      # The development shell output.
      # You can enter it with `nix develop`
      devShells.${system}.default = pkgs.mkShell {
        # This brings all the build tools and libraries into your development environment.
        packages = my-ags-bar.nativeBuildInputs ++ my-ags-bar.buildInputs;

        # A helpful message when you enter the shell.
        shellHook = ''
          echo "Entered AGS development shell."
          echo "The 'ags' command and all astal packages are now in your PATH."
        '';
      };
    };
}
