import { redirect } from "next/navigation";

export default function PeopleRedirect({ params }: any) {
  redirect(`/Courses/${params.cid}/People/Table`);
}
