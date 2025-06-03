// blog-posts.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput, GetBlogPostByIdInput, DeleteBlogPostInput } from './types/blog-posts.type';
import { BlogPostsService } from './blog-posts.service';

@Resolver(() => BlogPost)
export class BlogPostsResolver {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Mutation(() => BlogPost)
  createBlogPost(@Args('input') input: CreateBlogPostInput) {
    return this.blogPostsService.create(input);
  }

  @Query(() => [BlogPost])
  findAllBlogPosts() {
    return this.blogPostsService.findAll();
  }

  @Query(() => BlogPost)
  findOneBlogPost(@Args('input') input: GetBlogPostByIdInput) {
    return this.blogPostsService.findOne(input.blog_post_id);
  }

  @Mutation(() => BlogPost)
  updateBlogPost(@Args('input') input: UpdateBlogPostInput) {
    return this.blogPostsService.update(input.blog_post_id, input);
  }

  @Mutation(() => Boolean)
  deleteBlogPost(@Args('input') input: DeleteBlogPostInput) {
    return this.blogPostsService.remove(input.blog_post_id);
  }
}