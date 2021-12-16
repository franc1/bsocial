import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface IComment {
  senderUsername: string;
  senderEmail: string;
  senderId: number;
  timestamp: number;
  postId: number;
  commentId: number;
  commentContent: string;
  postOwnerId: number;
}

@WebSocketGateway({ namespace: '/comment' })
export class BsocialNotificationsMicroserviceGateway
  implements OnGatewayConnection
{
  constructor(private readonly jwtService: JwtService) {}

  sockets: { [userId: number]: Socket[] } = {};

  handleConnection(client: Socket) {
    const token =
      client?.handshake?.headers?.authorization?.split('Bearer ')[1];
    if (!token) {
      console.log('There is no valid token. Closing connection...');
      client.disconnect();
    }

    let userId: number;
    try {
      const decodedToken = this.jwtService.verify(token);
      userId = decodedToken.id;
    } catch (e) {
      console.log('There is no valid token. Closing connection...');
      client.disconnect();
    }

    // Add new socket connection to this.sockets
    if (this.sockets[userId]?.length) {
      this.sockets[userId].push(client);
    } else {
      this.sockets[userId] = [client];
    }
  }

  send(comment: IComment) {
    if (this.sockets[comment.postOwnerId]?.length) {
      // DO NOT send a notification to a user who has added a comment himself
      if (comment.postOwnerId !== comment.senderId) {
        this.sockets[comment.postOwnerId].forEach((c) =>
          c.emit('new-comment', comment),
        );
      }
    } else {
      console.log('There is no connection for userId:', comment.postOwnerId);
    }
  }
}
