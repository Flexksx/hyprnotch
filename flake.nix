{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      astal,
      ags,
      ...
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      # Define dependencies once to reuse them
      myBuildInputs = with astal.packages.${system}; [
        astal3
        io
        wireplumber
        bluetooth
        apps
        battery
        hyprland
        mpris
        cava
        network
        notifd
        tray
      ];
      myNativeBuildInputs = [
        ags.packages.${system}.default
        pkgs.wrapGAppsHook
        pkgs.gobject-introspection
        pkgs.sass
      ];

    in
    {
      # This is your production build
      packages.${system}.default = pkgs.stdenvNoCC.mkDerivation rec {
        name = "hyprnotch";
        src = ./.;
        nativeBuildInputs = myNativeBuildInputs;
        buildInputs = myBuildInputs;
        installPhase = ''
          mkdir -p $out/bin
          ags bundle app.ts $out/bin/${name}
        '';
      };

      # The devShell for `nix develop`
      devShells.${system}.default = pkgs.mkShell {
        nativeBuildInputs = myNativeBuildInputs;
        buildInputs = myBuildInputs;
      };

      # The app definition for `nix run`
      apps.${system}.default = {
        type = "app";
        program = "${
          pkgs.writeShellApplication {
            name = "run-hyprnotch";
            runtimeInputs = myNativeBuildInputs ++ myBuildInputs;
            # This is the command that `nix run` will execute
            text = ''
              ags run --gtk 3 app.tsx
            '';
          }
        }/bin/run-hyprnotch";
      };
    };
}
