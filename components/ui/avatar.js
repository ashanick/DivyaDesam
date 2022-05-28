import classes from './Avatar.module.css'
import Image from 'next/image';

function Avatar(props) {
  return (
    <div className={classes.avatar}>
      {props.image}
      <Image
        src={'/' + props.image}
        alt={props.alt}
        width={50}
        height={50}
        layout='responsive'
      />
    </div>
  );
};

export default Avatar;
