
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPost, fetchPost, fetchTags } from '../api/api'
const PostsList = () => {

    const {data:postData,isLoading} = useQuery({
        queryKey:["posts"],
        queryFn:fetchPost,
        gcTime:0,
        refetchInterval:1000*5,
      })


      const {data:tagData} = useQuery({
        queryKey:["tags"],
        queryFn:fetchTags,
        staleTime:Infinity,
      })

      const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:addPost,
        onMutate:()=>{
            return {id:1}
        },
        onSuccess: (data,variables,context)=>{
           queryClient.invalidateQueries({
            queryKey:["posts"]
           })
        }
     })

      if(isLoading){
        return(
          <div>
              Loading.....
          </div>
        )
      }

      const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const tags = Array.from(formData.keys()).filter((key)=>formData.get(key)==="on");
        console.log(title +":"+ tags);

        if(!title || !tags){
            return 
        }

        mutate({id:postData.length+1,title,tags});
        e.target.reset()
      }

  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Enter your post..'
            name='title'
            className='postbox'
            />
            <div className="tags">
                {tagData?.map((tag)=>(
                    <div key={tag}>
                        <input  name={tag} id={tag} type="checkbox" />
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                ))}
            </div>
            <button>Post</button>
        </form>
       {postData?.map((post)=>(
        <div key={post.id} className='post'>
            {post.title}
           {post.tags.map((tag)=>(
                <span key={tag}>
                    {tag}
                </span>
            ))}
        </div>
       ))}
    </div>
  )
}

export default PostsList