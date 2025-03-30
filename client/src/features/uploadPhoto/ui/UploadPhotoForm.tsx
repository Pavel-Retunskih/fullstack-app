import {SubmitHandler, useForm} from "react-hook-form";
import {useUploadTempPhotoMutation} from "../api/uploadPhotoApi.ts";
import {useEffect} from "react";

type Input = {
  photo: FileList;
}

export function UploadPhotoForm({callback}: { callback: (tempPhotoId: string) => void }) {
  const [uploadPhoto, {data: response, isSuccess}] = useUploadTempPhotoMutation();

  const {register, handleSubmit, watch} = useForm<Input>();
  const photo = watch('photo');
  const onSubmit: SubmitHandler<Input> = async (data) => {

    console.log('Selected file:', data.photo[0]);
    const formData = new FormData();
    formData.append('photo', data.photo[0]);

    try {
      await uploadPhoto(formData).unwrap();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  useEffect(() => {
    if (isSuccess && response?.tempPhotoId) {
      callback(response.tempPhotoId);
    }
  }, [isSuccess, response, callback]);
  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
              {...register('photo', {required: true})}
              type="file"
              accept="image/*"
          />
          {photo?.length > 0 && (
              <div>
                <p>Выбран файл: {photo[0].name}</p>
                <p>Размер: {(photo[0].size / 1024).toFixed(2)} KB</p>
              </div>
          )}
          <button type="submit">Upload</button>
        </form>
      </div>
  );
}