// types/blog-posts.type.ts
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogPost{
  @Field(() => ID)
  id: number;

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

  @Field({nullable: true})
  updated_at?: Date;

  @Field({nullable: true})
  publish_at?: Date;
}

@InputType()
export class PaginationBlogInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

@ObjectType()
export class PaginatedBlogPosts {
  @Field(() => [BlogPost])
  items: BlogPost[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;
}



@InputType()
export class CreateBlogPostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  category: string;

  @Field()
  author_id: string;
}

@InputType()
export class UpdateBlogPostInput {

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  category: string;

  @Field({nullable: true})
  updated_at?: Date;
}

@InputType()
export class GetBlogPostByIdInput {
  @Field(() => ID)
  id: number;
}
