import {CreateUserForm} from "../../../features/createUser/ui/CreateUserForm.tsx";
import {useNavigate} from "react-router";
import {UploadPhotoForm} from "../../../features/uploadPhoto/ui/UploadPhotoForm.tsx";
import {useState} from "react";

export function CreateUserPage() {
  const [tempPhotoId, setTempPhotoId] = useState<string | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const navigate = useNavigate();

  const callback = (tempPhotoId: string) => {
    setTempPhotoId(tempPhotoId);
  }
  return <div className={'flex flex-col justify-between border border-gray-700 bg-gray-900 p-4'}>
    <h1 className={'text-2xl text-amber-100 mb-10'}>Create User</h1>
    <div className={'flex justify-around  flex-wrap'}>
      <UploadPhotoForm callback={callback} gender={gender}/>
      <CreateUserForm tempPhotoId={tempPhotoId} getGender={(gender) => setGender(gender)}/>
    </div>
    <button onClick={() => navigate('/')} className={'mt-10'}>Back to users</button>
  </div>
}