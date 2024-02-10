import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  styled,
} from '@mui/material';
import PrimaryButton from '../Button/PrimaryButton';
import FriendList from './FriendList';
import InvitationsList from './InvitationsList';
import { useState } from 'react';
import InputLabel from '../InputLabel/InputLabel';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../stores/store';
import { sendFriendInvitation } from '../../stores/friendInvitation/friendInvitationThunk';
import { toast } from 'react-toastify';

const MainContainer = styled('div')({
  width: '224px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2f3136',
});

const additionalStyles = {
  marginTop: '10px',
  marginLeft: '5px',
  width: '80%',
  height: '30px',
  background: '#3ba55d',
};

const FriendSidebar = () => {
  const regExpEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = data => {
    dispatch(sendFriendInvitation(data))
      .unwrap()
      .then(res => {
        if (res.msg) {
          toast.success(res?.msg || 'Add friend successfully');
          setIsDialogOpen(false);
          setValue('email', '');
        }
      });
  };

  return (
    <MainContainer>
      <PrimaryButton
        label="Add Friend"
        type="button"
        classNames={additionalStyles}
        onClick={() => setIsDialogOpen(true)}
      />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          <Typography component={'span'}>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <DialogContentText component={'div'}>
              <Typography>Enter email address of friend which you would like to invite</Typography>
              <InputLabel
                id="email"
                register={register}
                label="Email"
                type="text"
                errors={errors}
                placeholder="Enter email address"
                pattern={regExpEmail}
              />
              <PrimaryButton
                type="submit"
                label="Send"
                classNames={{
                  marginTop: '1.5rem',
                }}
              />
            </DialogContentText>
          </form>
        </DialogContent>
      </Dialog>
      <FriendList />
      <InvitationsList />
    </MainContainer>
  );
};

export default FriendSidebar;
