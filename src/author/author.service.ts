import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  // CREATE AUTHOR VIA PRISMA SERVICE
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
    const bookData = authorDto.books?.map((book) => {
      return {
        title: book.title,
        description: book.description || null,
      };
    });

    console.log(bookData);

    try {
      const author = await this.prisma.author.create({
        data: {
          fistName: authorDto.firstName,
          lastName: authorDto.lastName,
          email: authorDto.email,
          address: authorDto.address,
          books: {
            create: bookData,
          },
        },
        include: { books: true },
      });
      console.log(author);
      return author;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          'Author with these credentials already exist',
        );
      } else if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Invalid credentials');
      } else {
        throw error;
      }
    }
  }

  // FIND AUTHOR VIA PRISMA SERVICE
  async findAuthors() {
    try {
      const authors = this.prisma.author.findMany({ include: { books: true } });
      return authors;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('No Data');
      } else {
        throw error;
      }
    }
  }
}
