import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  // CREATE BOOK VIA PRISMA SERVICE
  async createBook(bookDto: BookDto, authorId: string): Promise<any> {
    await this.prisma.$connect();
    const checkIfBookExist = await this.prisma.book.findUnique({
      where: {
        title: bookDto.title,
      },
    });

    if (checkIfBookExist) {
      throw new ForbiddenException('Book exists');
    }

    const checkIfAuthorExist = await this.prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!checkIfAuthorExist) {
      throw new ForbiddenException('Invalid Author Id');
    }

    try {
      const book = await this.prisma.book.create({
        data: {
          title: bookDto.title,
          description: bookDto.description,
          author: { connect: { id: authorId } },
        },
        include: { author: true },
      });

      return book;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          'Book with these credentials already exist',
        );
      } else if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Invalid credentials');
      } else {
        throw error;
      }
    }
  }

  // FIND ALL BOOKS VIA PRISMA SERVICE
  async findBooks() {
    try {
      const books = this.prisma.book.findMany({
        include: { author: true },
      });
      return books;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('No Data');
      } else {
        throw error;
      }
    }
  }

  // FIND A BOOK BY ID VIA PRISMA SERVICE
  async findBook(id: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id: id },
        include: { author: true },
      });
      return book;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('No Data');
      } else {
        throw error;
      }
    }
  }
}
