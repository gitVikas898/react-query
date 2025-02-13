export const fetchPost = async(page)=>{
    const data = await fetch(`http://localhost:3000/posts?_sort=-id&${page ? `_page=${page}&_per_page=5`:""}`);
    const response = await data.json();
    return response;
}

export const addPost = async(post)=>{
    const response = await  fetch("http://localhost:3000/posts",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(post),
    });
    return response.json();
}
export const fetchTags = async()=>{
    const response = await fetch("http://localhost:3000/tags");
    const tagsData = await response.json();
    return tagsData;
}