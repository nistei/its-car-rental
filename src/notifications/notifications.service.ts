import { Injectable, Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notifications: Repository<Notification>,
  ) {
  }

  send(recipient: User, topic: string, content: string): Promise<Notification> {
    this.logger.log(`Sending notification to user '${recipient.id}' with topic '${topic}'`);

    // Hey there! Yes, we should probably do something here.
    // TODO: Send notification

    return this.notifications.save<Notification>({
      recipient,
      topic,
      content
    });
  }
}
