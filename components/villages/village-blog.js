import classes from './village-blog.module.css'
import Image from 'next/image'
import PhotoGrid from '../memories/photo-grid';

function VillageBlog(props){
    const {name, description, imageURL, author, blogDate,
        title, photoList} = props.items
    // console.log('Village Blog : ', props.items)
    var photoState = false;
    if (props.items.photoList.length > 0){
        photoState = true
    }
    
    return (
        <div className={classes.blogmain}>
            <div className={classes.blogtop}>
                <div className={classes.blogmain__left}>
                    <h3>{name}</h3> 
                    <div className={classes.image}>
                        <Image  
                            src={'/' + imageURL}
                            alt={name}
                            width={300}
                            height={300}
                            layout='responsive'
                            />
                    </div>
                </div>
                <div className={classes.blogmain__right}>
                    <h3>{title}</h3>
                    <p>Author: {author},     Dated: {blogDate}</p>
                    {description}
                </div>
            </div>
           
            <div className={classes.blog__bottom}>
                <hr style={{ padding: '0 20px', border: '1px solid red'}}></hr>
                <h2>Photo Gallery</h2>
                {photoState && 
                    <PhotoGrid items={props.items} />
                }
                {!photoState && 
                    <h2>Please share stories and photos</h2>
                }
            </div>
        </div>
    )
}

export default VillageBlog