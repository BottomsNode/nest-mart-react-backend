import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      this.logger.log(`Connected to ${process.env.DB_NAME} database`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to connect to ${process.env.DB_NAME} database: ${error.message}`,
        );
      } else {
        this.logger.error(
          `Failed to connect to ${process.env.DB_NAME} database: ${String(error)}`,
        );
      }
      throw error;
    }
  }
}
