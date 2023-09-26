import { Formik } from "formik";
import * as Yup from "yup";

function Signup() {
    return (
        <div className="flex flex-col justify-center w-1/3">
            <h2 className="text-lg p-2 min-w-[5em] bg-secondary text-center rounded-tl rounded-tr">
                Signup
            </h2>
            <SignupForm />
        </div>
    );
}

function SignupForm() {
    // eslint-disable-next-line no-unused-vars
    const validate = (values) => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = "Required";
        }

        if (!values.lastName) {
            errors.lastName = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Invalid email";
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (!/(?=.*[A-Z])/.test(values.password)) {
            errors.password = "Must contain uppercase letters";
        } else if (!/(?=.*[a-z])/.test(values.password)) {
            errors.password = "Must contain lowercase letters";
        } else if (!/(?=.*\d)/.test(values.password)) {
            errors.password = "Must contain digits";
        } else if (!/(?=.*[-_~!@#$%^&+])/.test(values.password)) {
            errors.password = "Must contain symbols";
        }

        return errors;
    };

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required("First name is required"),
                    lastName: Yup.string().required("Last name is required"),
                    email: Yup.string()
                        .email("Not a valid email address")
                        .required("Email is required"),
                })}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(formik) => (
                    <form className="bg-primary rounded-bl rounded-br p-4" onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-3">
                            <div>
                                {" "}
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.firstName ? (
                                    <div>{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                {" "}
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.lastName ? (
                                    <div>{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                            <div>
                                {" "}
                                <label htmlFor="email">e-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                {" "}
                                <label htmlFor="password">password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>

                        <button type="submit">Sign up</button>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default Signup;
