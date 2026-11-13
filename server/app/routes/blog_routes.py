from flask import Blueprint, request, jsonify

blog_bp = Blueprint('blog', __name__)

# In-memory blog storage for demo
blogs = [
    {
        'id': 1,
        'title': 'First Blog Post',
        'author_name': 'Admin',
        'timestamp': 1722854400,
        'content': 'This is the summary of the first blog post.',
        'comments': ['Great post!']
    },
    {
        'id': 2,
        'title': 'Second Blog Post',
        'author_name': 'Admin',
        'timestamp': 1722854400,
        'content': 'This is the summary of the second blog post.',
        'comments': ['Thanks for sharing.']
    }
]

@blog_bp.route('/api/blogs', methods=['GET'])
def get_blogs():
    return jsonify(blogs)

@blog_bp.route('/api/blogs/<int:blog_id>', methods=['GET'])
def get_blog(blog_id):
    blog = next((b for b in blogs if b['id'] == blog_id), None)
    if blog:
        return jsonify(blog)
    return jsonify({'error': 'Blog not found'}), 404

@blog_bp.route('/api/blogs', methods=['POST'])
def add_blog():
    data = request.json
    new_blog = {
        'id': max(b['id'] for b in blogs) + 1 if blogs else 1,
        'title': data.get('title'),
        'author_name': data.get('author_name'),
        'timestamp': data.get('timestamp'),
        'content': data.get('content'),
        'comments': []
    }
    blogs.append(new_blog)
    return jsonify(new_blog), 201

@blog_bp.route('/api/blogs/<int:blog_id>', methods=['PUT'])
def edit_blog(blog_id):
    data = request.json
    for blog in blogs:
        if blog['id'] == blog_id:
            blog['title'] = data.get('title', blog['title'])
            blog['author_name'] = data.get('author_name', blog['author_name'])
            blog['content'] = data.get('content', blog['content'])
            return jsonify(blog)
    return jsonify({'error': 'Blog not found'}), 404

@blog_bp.route('/api/blogs/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    global blogs
    blogs = [b for b in blogs if b['id'] != blog_id]
    return jsonify({'result': 'Deleted'})

@blog_bp.route('/api/blogs/<int:blog_id>/comments', methods=['POST'])
def add_comment(blog_id):
    data = request.json
    comment = data.get('comment')
    for blog in blogs:
        if blog['id'] == blog_id:
            blog['comments'].append(comment)
            return jsonify(blog)
    return jsonify({'error': 'Blog not found'}), 404
