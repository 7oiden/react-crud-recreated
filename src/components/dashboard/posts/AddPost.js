import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import MediaDropdown from "../media/MediaDropdown";
import DashboardPage from "../DashboardPage";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function AddPost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useNavigate();
  const http = useAxios();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    if (data.featured_media === "") {
        data.featured_media = null;
    }

    console.log(data);

    try {
      const response = await http.post("wp/v2/posts", data);
      console.log("response", response.data);
      history("/dashboard/posts");
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardPage>
      <Heading content="Add post"></Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <input placeholder="Title" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>
          <div>
            <textarea
              placeholder="Content"
              {...register("content")}
            />
          </div>
          <div>
            <MediaDropdown register={register} />
          </div>
          <button>{submitting ? "Submitting..." : "Submit"}</button>
        </fieldset>
      </form>
    </DashboardPage>
  );
}
