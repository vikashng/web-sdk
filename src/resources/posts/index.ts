import { Base } from '../base';
import { NewPost, Post } from './types';

const resourceName = 'posts';

export class Posts extends Base {
  getPostById(id: number): Promise<Post> {
    return this.request<Post>(`/${resourceName}/${id}`);
  }

  getPosts(): Promise<Post[]> {
    return this.request<Post[]>(`/${resourceName}`);
  }

  createPost(newPost: NewPost): Promise<Post> {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(newPost),
    };

    return this.request<Post>(`/${resourceName}`, options);
  }
}
