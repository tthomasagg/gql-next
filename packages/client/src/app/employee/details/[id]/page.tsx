import EmployeeDetails from "@/app/components/employeedetails/EmployeeDetails";

type DetailsPageParams = {
  id: string;
};

type DetailsPageProps = {
  params: DetailsPageParams;
  searchParams: {};
};

const DetailsPage = ({ params: { id } }: DetailsPageProps) => {
  return (
    <div>
      <EmployeeDetails id={id} />
    </div>
  );
};

export default DetailsPage;
