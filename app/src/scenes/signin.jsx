import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../components/spinner";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/user/userSlice";
import { setUser } from "../redux/user/userSlice";
import API from "../../api";

function SignIn() {
  return (
    <div className="flex flex-col justify-center w-1/3">
      <h2 className="text-lg p-2 min-w-[5em] bg-secondary text-center rounded-tl rounded-tr">
        Sign in
      </h2>
      <SignInForm />
    </div>
  );
}

function SignInForm() {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          username: "oussama161",
          password: "Passowrd123&&",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("User name is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          let response = await API.post("/users/login", values);
          response = await response.json();
          dispatch(setAuthToken(response.token));
          API.setAuthToken(response.token);
          dispatch(setUser(response.user));
          setSubmitting(false);
          console.log(response);
        }}
      >
        {(formik) => (
          <form
            className="flex flex-col items-center gap-5 bg-primary rounded-bl rounded-br p-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="min-w-[6em] bg-secondary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="username"
                  >
                    User name
                  </label>
                  <input
                    className="grow px-2 py-1 rounded-tr rounded-br"
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <BiErrorCircle className="text-red-500" />
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="min-w-[6em] bg-secondary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="password"
                  >
                    password
                  </label>
                  <input
                    className="grow px-2 py-1 rounded-tr rounded-br"
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <BiErrorCircle className="text-red-500" />
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <button
              className="flex justify-center w-1/3 bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
              type="submit"
            >
              {formik.isSubmitting ? <Spinner /> : <span>Sign in</span>}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default SignIn;
