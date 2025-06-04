// blog-posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostInput, UpdateBlogPostInput } from './types/blog-posts.type';
import { BlogPost as PrismaBlogPost } from '@prisma/client';

@Injectable()
export class BlogPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateBlogPostInput): Promise<PrismaBlogPost> {
    return this.prisma.blogPost.create({
      data: { ...input },
    });
  }

  async findAll(): Promise<PrismaBlogPost[]> {
    return this.prisma.blogPost.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number): Promise<PrismaBlogPost> {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { post_id: id },
    });
    if (!blogPost) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }
    return blogPost;
  }

  async update(id: number, input: UpdateBlogPostInput): Promise<PrismaBlogPost> {
    await this.findOne(id); // ensure exists
    return this.prisma.blogPost.update({
      where: { post_id: id },
      data: { ...input, updated_at: new Date() },
    });
  }

  async remove(id: number): Promise<PrismaBlogPost> {
    await this.findOne(id); // ensure exists
    return this.prisma.blogPost.delete({
      where: { post_id: id },
    });
  }
}