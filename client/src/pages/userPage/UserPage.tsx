import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useGetUserByIdQuery, useRemoveUserMutation} from "../../entities/user/api/userApi.ts";
import {EditUserForm} from "../../features/editUser/editUserForm.tsx";

export function UserPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [removeUser] = useRemoveUserMutation();
  const {data: user, isSuccess} = useGetUserByIdQuery({id: id!})

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  console.log(user)
  if (!id) {
    return <div>User not found</div>;
  }

  const handleDelete = (id: string) => {
    removeUser({id})
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
  };
  
  return (
      isSuccess && <div>
        {isEditMode ? (
            <EditUserForm user={user}/>
        ) : (
            <div key={user.id}
                 className={'flex flex-row items-center justify-between flex-wrap border border-amber-50' +
                     ' px-5 py-2 rounded-md'}>
              <img src={user.photoUrl} alt="asdasd" className={'h-[200px] w-[200px] rounded-full'}/>
              <div className={'flex flex-col flex-grow flex-wrap gap-10'}>
                <h3 className={'w-full text-3xl text-gray-800 py-4'}
                    onClick={() => navigate(`/users/${user.id}`)}>{user.firstName} {user.lastName}</h3>
                <div className={'flex flex-row flex-grow flex-wrap justify-around '}>
                  <div>
                    <div>
                      <span>Пол: {user.gender === 'male' ? 'Мужской' : 'Женский'}</span>
                    </div>
                    <div>
                      <h3>Рост и вес</h3>
                      <span>Вес: {user.weight}</span>
                      <span>Рост: {user.height}</span>
                    </div>
                  </div>
                  <div>
                    <h3>Место жительства</h3>
                    <span>{user.residence}</span>
                  </div>
                </div>
              </div>

            </div>
        )}
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <button onClick={() => setIsEditMode((prev) => !prev)}>Edit</button>
        </div>
      </div>
  );

}
