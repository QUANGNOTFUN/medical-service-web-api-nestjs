// types/blog-posts.type.ts
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogPost{
  @Field(() => ID)
  blog_post_id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  author_id: string;

  @Field()
  category: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@InputType()
export class CreateBlogPostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field()
  category: string;

  @Field()
  author_id: string;
}

@InputType()
export class UpdateBlogPostInput {
  @Field(() => ID)
  blog_post_id: number;

  @Field({ nullable: true })
  title?: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class GetBlogPostByIdInput {
  @Field(() => ID)
  blog_post_id: number;
}

@InputType()
export class DeleteBlogPostInput {
  @Field(() => ID)
  blog_post_id: number;
}