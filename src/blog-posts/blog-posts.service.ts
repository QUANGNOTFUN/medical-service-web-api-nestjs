// blog-posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostInput, PaginatedBlogPosts, UpdateBlogPostInput } from './types/blog-posts.type';
import { BlogPost as PrismaBlogPost } from '@prisma/client';

@Injectable()
export class BlogPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateBlogPostInput): Promise<PrismaBlogPost> {
    return this.prisma.blogPost.create({
      data: { ...input },
    });
  }

  async findAll(page: number, pageSize: number): Promise<PaginatedBlogPosts> {
    const skip = (page - 1) * pageSize;

    const [rawItems, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        skip,
        take: pageSize,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.blogPost.count(),
    ]);

    const items: {
      id: number;
      title: string;
      content: string;
      category: string;
      author_id: string;
      created_at: Date;
      updated_at: Date | undefined;
      publish_at: Date | undefined
    }[] = rawItems.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      author_id: item.author_id,
      created_at: item.created_at,
      updated_at: item.updated_at ?? undefined,
      publish_at: item.published_at ?? undefined,
    }));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }





  async findOne(id: number): Promise<PrismaBlogPost> {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id },
    });
    if (!blogPost) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }
    return blogPost;
  }

  async update(id: number, input: UpdateBlogPostInput): Promise<PrismaBlogPost> {
    await this.findOne(id);
    return this.prisma.blogPost.update({
      where: { id },
      data: { ...input, updated_at: new Date() },
    });
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id); // kiểm tra tồn tại trước khi xóa
    await this.prisma.blogPost.delete({
      where: { id },
    });
    return true; // ✔️ trả về boolean
  }
}