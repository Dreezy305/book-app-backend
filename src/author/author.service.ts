import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async findAuthors() {
    return {
      id: 1,
      email: 'bankoleidris@gmail.com',
      firstName: 'Idris',
      lastName: 'Bankole',
    };
  }

  async createAuthor(authorDto: AuthorDto): Promise<any> {
    await this.prisma.$connect();
    //   check if author exists
    const checkIfAuthorExist = await this.prisma.author.findUnique({
      where: {
        email: authorDto.email,
      },
    });

    if (checkIfAuthorExist) {
      throw new ForbiddenException('Author with these credentials exists');
    }

    try {
      const author = await this.prisma.author.create({
        data: {
          fistName: authorDto.firstName,
          lastName: authorDto.lastName,
          email: authorDto.email,
          address: authorDto.address,
        },
      });

      return {
        success: true,
        data: author,
        status: HttpStatus.CREATED,
        message: 'Author created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          'User with these credentials already exist',
        );
      } else if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Invalid credentials');
      } else {
        throw error;
      }
    }
  }
}
