
const socket = io();
socket.on('recieve-message',(details)=>{
    showcomment(details)
})
socket.on('recieve-like',(count)=>{
    setLike(count)
})
window.addEventListener('DOMContentLoaded',async()=>{
    const response= await axios.get('/get-posts')
    const posts=response.data.posts[0]
    for(var i=0;i<posts.length;i++){
        showPostOnScreen(posts[i])
    }
})
function showPostOnScreen(post){
    const postlist=document.querySelector('#postlist')
   const ChildHtml=`
   <div class="post" id="">
      <p><strong>Caption:</strong>${post.description}</p>
      <img src="${post.imageUrl}" alt="Post Image">
      <button onclick="increaselike()">Like</button>
      <button>Comment</button>
      <div>Total likes- <span id="likeCnt">${post.likeCnt}</span></div>
      <div id="commentSec">
        <div id="commentInput">
        <input type="text" placeholder="Enter Your comment" id="commentinp"> 
      <button onclick="commentpost()">Send</button>
        </div>
      
      <ul class='comment-sec' id="comment-sec">
       
      </ul>
    </div>
    </div>
   ` 
   postlist.innerHTML+=ChildHtml;
}
function increaselike(){
   const likeValue=document.querySelector('#likeCnt');
   const count =+likeValue.innerHTML+1
   likeValue.innerHTML=count
   socket.emit('user-like',count);
}
function commentpost(){
    const commentinput=document.querySelector('#commentinp');
    showcomment(commentinput.value)
    socket.emit('user-message',commentinput.value);
    commentinput.value='';
    console.log('s')
}
function showcomment(data){
    const commentSec=document.querySelector('#comment-sec')
    const ChildHtml=`<li>${data}</li>`;
    commentSec.innerHTML+=ChildHtml
    
}
function setLike(count){
    const likeValue=document.querySelector('#likeCnt');
    likeValue.innerHTML=count
}