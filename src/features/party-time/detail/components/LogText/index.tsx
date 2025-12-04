import moment from "moment";

const LogText = () => {
  return (
    <p className="flex justify-between px-2 py-1 gap-2">
      <span>
        <span className="font-bold">Tisu Paseo </span> <span>is set to </span>
        <span className="text-secondary-foreground font-bold">Active </span>
      </span>
      <span className="text-accent-foreground">
        {moment().format("DD/MM/YYYY HH:mm:s")}
      </span>
    </p>
  );
};

export default LogText;
