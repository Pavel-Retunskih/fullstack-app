import {CreateUserForm} from "../../../features/createUser/ui/CreateUserForm.tsx";
import {useNavigate} from "react-router";
import {UploadPhotoForm} from "../../../features/uploadPhoto/ui/UploadPhotoForm.tsx";
import {useState} from "react";

export function CreateUserPage() {
  const [tempPhotoId, setTempPhotoId] = useState<string | null>(null);
  const navigate = useNavigate();

  const callback = (tempPhotoId: string) => {
    setTempPhotoId(tempPhotoId);
  }
  return <div>
    <h1>Create User</h1>
    <button onClick={() => navigate('/')}>Back to users</button>
    <UploadPhotoForm callback={callback}/>
    <CreateUserForm tempPhotoId={tempPhotoId}/>
  </div>
}