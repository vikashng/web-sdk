type Config = {
  apiKey: string;
  baseUrl?: string;
};

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://jsonplaceholder.typicode.com';
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'api-key': this.apiKey,
    };
    const config: RequestInit = {
      ...options,
      headers,
    };

    return fetch(url, config)
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<T>;
        }
        throw new Error(response.statusText);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }
}
