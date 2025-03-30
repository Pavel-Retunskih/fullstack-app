import {SubmitHandler, useForm} from "react-hook-form";
import {useCreateUserMutation} from "../api/createUserApi.ts";

type Inputs = {
  firstName: string,
  lastName: string,
  height: number,
  weight: number,
  gender: 'male' | 'female',
  residence: string
}

export function CreateUserForm({tempPhotoId}: { tempPhotoId: string | null }) {
  const [registerUser] = useCreateUserMutation()
  const {register, handleSubmit} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      registerUser({...data, tempPhotoId})
    } catch (err) {
      console.log(err)
    }
  }
  return (<div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>First Name</label>
          <input {...register('firstName')} type="text" placeholder="First Name"/>
          <label>Last Name</label>
          <input {...register('lastName')} type="text" name="lastName" placeholder="Last Name"/>
          <label>Gender Selection</label>
          <select {...register("gender")}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <input {...register('height')} type="number" name="height" placeholder="height"/>
          <input {...register('weight')} type="number" name="weight" placeholder="weight"/>
          <input {...register('residence')} type="text" name="residence" placeholder="residence"/>
          <button type="submit">submit</button>
        </form>
      </div>

  );
}

