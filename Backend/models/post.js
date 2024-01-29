const db=require('../database/database')

class Posts{
    constructor(id,userName, imageUrl, description, like) {
        this.id=id;
        this.userName = userName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.likeCnt=like;
      }
      save() {
        return db.execute('INSERT INTO posts (userName, imageUrl, description, likeCnt ) VALUES (?, ?, ?, ?)',
        [this.userName, this.imageUrl, this.description, this.likeCnt]);
      }
      static fetchAll() {
        return db.execute('SELECT * FROM posts')
       }
}
module.exports=Posts;