# Blog API Examples

## Create Blog - Minimal Required Fields

```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine. It allows developers to build scalable network applications using JavaScript on the server side."
}
```

## Create Blog - Draft with All Fields

```json
{
  "title": "Complete Guide to React Hooks",
  "content": "React Hooks revolutionized the way we write React components. In this comprehensive guide, we'll explore useState, useEffect, useContext, and custom hooks. Hooks allow you to use state and other React features without writing a class component. They make your code more readable and easier to test.",
  "excerpt": "Learn everything about React Hooks in this comprehensive guide covering useState, useEffect, and custom hooks.",
  "status": "draft",
  "category": "Web Development",
  "tags": ["react", "javascript", "hooks", "frontend"],
  "featuredImage": "https://example.com/images/react-hooks.jpg"
}
```

## Create Blog - Published Post

```json
{
  "title": "10 Tips for Writing Clean Code",
  "content": "Writing clean code is essential for maintainability and collaboration. Here are 10 practical tips: 1. Use meaningful variable names. 2. Keep functions small and focused. 3. Write comments for complex logic. 4. Follow consistent formatting. 5. Avoid deep nesting. 6. Use early returns. 7. Handle errors properly. 8. Write unit tests. 9. Refactor regularly. 10. Review your code before committing.",
  "excerpt": "Discover 10 practical tips to write cleaner, more maintainable code that your team will love.",
  "status": "published",
  "category": "Best Practices",
  "tags": ["clean-code", "programming", "best-practices"],
  "featuredImage": "https://example.com/images/clean-code.jpg"
}
```

## Create Blog - Technical Tutorial

```json
{
  "title": "Building RESTful APIs with Express.js",
  "content": "Express.js is a minimal and flexible Node.js web application framework. In this tutorial, we'll build a complete RESTful API with CRUD operations, authentication, and error handling. We'll cover routing, middleware, database integration with MongoDB, and best practices for API design. By the end, you'll have a production-ready API template.",
  "excerpt": "Step-by-step guide to building a production-ready RESTful API using Express.js and MongoDB.",
  "status": "published",
  "category": "Backend Development",
  "tags": ["nodejs", "express", "api", "mongodb", "backend"],
  "featuredImage": "https://example.com/images/express-api.jpg"
}
```

## Create Blog - Short Blog Post

```json
{
  "title": "Why TypeScript is Worth Learning",
  "content": "TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime. It improves code quality, enhances IDE support with better autocomplete, and makes refactoring safer. The learning curve is gentle if you already know JavaScript, and the benefits are immediate.",
  "status": "published",
  "category": "Programming Languages",
  "tags": ["typescript", "javascript", "programming"]
}
```

## Create Blog - Personal Story

```json
{
  "title": "My Journey from Bootcamp to Senior Developer",
  "content": "Five years ago, I enrolled in a coding bootcamp with zero programming experience. Today, I'm a senior developer at a tech company. This is my story of persistence, continuous learning, and overcoming imposter syndrome. I'll share the challenges I faced, the resources that helped me, and advice for aspiring developers. The journey wasn't easy, but it was worth every struggle.",
  "excerpt": "A personal story of growth from coding bootcamp graduate to senior developer in 5 years.",
  "status": "published",
  "category": "Career",
  "tags": ["career", "personal-story", "developer-journey", "motivation"],
  "featuredImage": "https://example.com/images/developer-journey.jpg"
}
```

## Create Blog - With Multiple Tags

```json
{
  "title": "Microservices Architecture: Pros and Cons",
  "content": "Microservices architecture has become increasingly popular, but it's not a silver bullet. Let's explore the advantages like independent deployment, technology flexibility, and scalability. We'll also discuss the challenges including increased complexity, distributed system problems, and operational overhead. Understanding both sides helps you make informed architectural decisions.",
  "excerpt": "An honest look at microservices architecture - benefits, challenges, and when to use it.",
  "status": "published",
  "category": "Software Architecture",
  "tags": ["microservices", "architecture", "scalability", "distributed-systems", "backend", "devops"],
  "featuredImage": "https://example.com/images/microservices.jpg"
}
```

## Create Blog - Without Featured Image

```json
{
  "title": "Understanding JavaScript Closures",
  "content": "Closures are one of the most powerful features in JavaScript. A closure is a function that has access to variables in its outer scope, even after the outer function has returned. This concept is fundamental to understanding JavaScript and is used extensively in modern frameworks. Let's break down how closures work with practical examples.",
  "status": "published",
  "category": "JavaScript",
  "tags": ["javascript", "closures", "programming-concepts"]
}
```

## Update Blog Example

```json
{
  "title": "Updated: Complete Guide to React Hooks",
  "content": "Updated content with new examples and React 18 features...",
  "status": "published",
  "tags": ["react", "javascript", "hooks", "frontend", "react18"]
}
```

## Query Parameters Examples

### Get All Blogs with Filters
```
GET /api/blogs?page=1&limit=10&status=published&category=Web Development&sortBy=-createdAt
```

### Search Blogs
```
GET /api/blogs?search=react hooks&limit=20
```

### Filter by Tags
```
GET /api/blogs?tags=javascript,nodejs&status=published
```

### Get User's Blogs
```
GET /api/blogs/user/my-blogs?page=1&limit=10&status=draft
```

## Response Examples

### Successful Creation Response
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "title": "Getting Started with Node.js",
    "slug": "getting-started-with-nodejs",
    "content": "Node.js is a powerful JavaScript runtime...",
    "excerpt": "Node.js is a powerful JavaScript runtime...",
    "author": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "draft",
    "category": "Uncategorized",
    "tags": [],
    "views": 0,
    "likes": [],
    "likeCount": 0,
    "publishedAt": null,
    "createdAt": "2024-02-13T10:30:00.000Z",
    "updatedAt": "2024-02-13T10:30:00.000Z"
  }
}
```

### Get All Blogs Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "title": "Getting Started with Node.js",
      "slug": "getting-started-with-nodejs",
      "excerpt": "Node.js is a powerful JavaScript runtime...",
      "author": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "published",
      "category": "Backend Development",
      "tags": ["nodejs", "javascript"],
      "views": 150,
      "likeCount": 25,
      "publishedAt": "2024-02-13T10:30:00.000Z",
      "createdAt": "2024-02-13T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalBlogs": 48,
    "limit": 10
  }
}
```

### Validation Error Response
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "msg": "Title is required",
      "path": "title",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Content must be at least 10 characters",
      "path": "content",
      "location": "body"
    }
  ]
}
```

### Authorization Error Response
```json
{
  "success": false,
  "message": "You are not authorized to update this blog"
}
```

## Testing with cURL

### Create Blog
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post. It contains valuable information.",
    "status": "published",
    "category": "General",
    "tags": ["first-post", "introduction"]
  }'
```

### Get All Blogs
```bash
curl -X GET "http://localhost:5000/api/blogs?page=1&limit=10&status=published"
```

### Update Blog
```bash
curl -X PUT http://localhost:5000/api/blogs/BLOG_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Blog Title",
    "status": "published"
  }'
```

### Delete Blog
```bash
curl -X DELETE http://localhost:5000/api/blogs/BLOG_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Like Blog
```bash
curl -X POST http://localhost:5000/api/blogs/BLOG_ID/like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
