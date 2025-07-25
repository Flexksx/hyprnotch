import Logger from '../../logger/Logger';
import { existsSync, mkdirSync } from 'fs';
import { basename, extname, join } from 'path';

export default class ThumbnailService {
  private static instance: ThumbnailService;
  private logger = new Logger(this.constructor.name);
  private readonly THUMBNAIL_DIR = '/home/ccretu/.cache/hyprnotch/thumbnails';
  private readonly THUMBNAIL_SIZE = 200; // Size for thumbnails

  private constructor() {
    this.ensureThumbnailDir();
  }

  public static getInstance(): ThumbnailService {
    if (!this.instance) {
      this.instance = new ThumbnailService();
    }
    return this.instance;
  }

  private ensureThumbnailDir(): void {
    if (!existsSync(this.THUMBNAIL_DIR)) {
      mkdirSync(this.THUMBNAIL_DIR, { recursive: true });
      this.logger.debug('Created thumbnail directory:', this.THUMBNAIL_DIR);
    }
  }

  public getThumbnailPath(originalPath: string): string {
    const fileName = basename(originalPath, extname(originalPath));
    const hash = this.hashString(originalPath);
    return join(this.THUMBNAIL_DIR, `${fileName}_${hash}.jpg`);
  }

  public async createThumbnail(originalPath: string): Promise<string> {
    const thumbnailPath = this.getThumbnailPath(originalPath);

    if (existsSync(thumbnailPath)) {
      return thumbnailPath;
    }

    try {
      try {
        await this.execAsync(['which', 'convert']);
      } catch {
        this.logger.debug('ImageMagick not available, using original image');
        return originalPath;
      }

      await this.execAsync([
        'convert',
        originalPath,
        '-thumbnail',
        `${this.THUMBNAIL_SIZE}x${this.THUMBNAIL_SIZE}^`,
        '-gravity',
        'center',
        '-extent',
        `${this.THUMBNAIL_SIZE}x${this.THUMBNAIL_SIZE}`,
        '-quality',
        '85',
        '-strip', // Remove metadata for smaller file size
        thumbnailPath
      ]);

      this.logger.debug('Created thumbnail:', thumbnailPath);
      return thumbnailPath;
    } catch (error) {
      this.logger.error(
        'Error creating thumbnail for',
        originalPath,
        ':',
        error
      );
      // Return original path if thumbnail creation fails
      return originalPath;
    }
  }

  private async execAsync(command: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const result = exec(command);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  public hasThumbnail(originalPath: string): boolean {
    return existsSync(this.getThumbnailPath(originalPath));
  }
}
