export function CreateUserForm() {

  return (<div>
        <form action="http://localhost:3000/users/upload-temp-photo"
              method="post"
              encType="multipart/form-data">
          <input type="file" name="photo"/>
          <button type="submit">Upload</button>
        </form>
        <form action="http://localhost:3000/users/create-user">
          <input type="text" name="firstName" placeholder="First Name"/>
          <input type="text" name="lastName" placeholder="Last Name"/>
          <input type="number" name="height" placeholder="height"/>
          <input type="number" name="weight" placeholder="weight"/>
          <input type="text" name="gender" placeholder="gender"/>
          <input type="text" name="residence" placeholder="residence"/>
          <button type="submit">submit</button>
        </form>
      </div>

  );
}

