import { Link, useParams } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';

interface ServerItemProps {
  name: string;
  imgUrl: string;
  _id: string;
}

const ServerItem = ({ name, imgUrl, _id }: ServerItemProps) => {
  const params = useParams();
  const { id } = params;

  return (
    <Link className="-ml-1 relative" to={`/server/${_id}`}>
      <Avatar username={name} img={imgUrl} />
      {id === _id && (
        <div className="absolute left-0 top-0 w-2 flex items-center h-10 -ml-2">
          <span className="h-10 w-1 rounded-[0_4px_4px_0] bg-white absolute z-10 block" />
        </div>
      )}
    </Link>
  );
};

export default ServerItem;
