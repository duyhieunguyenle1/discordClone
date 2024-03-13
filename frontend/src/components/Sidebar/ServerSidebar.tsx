import AddIcon from '@mui/icons-material/Add';

const ServerSidebar = () => {
  return (
    <>
      <div
        className="bg-[#5865f2] text-white m-0 p-0 mt-[10px] rounded-2xl w-12 h-12 min-w-0 flex items-center justify-center cursor-pointer
        hover:opacity-80 duration-300 transition-all"
      >
        <AddIcon />
      </div>
    </>
  );
};

export default ServerSidebar;
