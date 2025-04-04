import {SubmitHandler, useForm} from "react-hook-form";
import {useUploadTempPhotoMutation} from "../api/uploadPhotoApi.ts";
import {useEffect, useState} from "react";
import maleAvatar from '../../../assets/default-male.jpg'
import femaleAvatar from '../../../assets/default-female.jpg'


type Input = {
  photo: FileList;
}

export function UploadPhotoForm({callback, gender}: {
  callback: (tempPhotoId: string) => void,
  gender: 'male' | 'female'
}) {
  const [uploadPhoto, {data: response, isSuccess}] = useUploadTempPhotoMutation();
  const {register, handleSubmit} = useForm<Input>();
  const [preview, setPreview] = useState<string | null>(null);

  const photoPath = {
    male: maleAvatar,
    female: femaleAvatar
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {

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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
      <div className={'flex flex-col bg-gray-400 border border-gray-600 rounded-md py-4 px-12 items-center'}>
        <img className={'w-[200px] h-[200px] '} src={preview ? preview : photoPath[gender]}/>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className={'flex flex-col gap-5 w-full'}>
          <input
              {...register('photo', {required: true})}
              type="file"
              accept="image/*"
              onChange={event => {
                register("photo").onChange(event)
                handleImageChange(event)
              }}
              className={'hidden'}
              id="file-upload"
          />
          <label htmlFor="file-upload"
                 className={" mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" +
                     " transition"}>Select
            file</label>
          <button type="submit" className={'disabled:opacity-65 bg-green-500 text-white px-2 py-2 rounded-md' +
              ' hover:bg-blue-600" +\n' +
              '                     " transition'} disabled={!preview}>Upload
          </button>
        </form>
      </div>
  );
}