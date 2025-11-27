import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useRegisterMutation from "./hooks/useRegisterMutation";
import { RegisterFormSchema, type RegisterType } from "./schema";

const Register = () => {
  const mutation = useRegisterMutation();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;

  const handleSubmit = (data: RegisterType) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="sm:min-w-[375px]">
        <CardHeader>
          <CardTitle>
            <Link to="/login">
              <Button className="p-0! mb-3" variant="link">
                <ArrowLeft />
                <span>Back to Login</span>
              </Button>
            </Link>
            <h2 className="text-3xl">Sign Up</h2>
            <h2 className="text-sm text-primary font-normal">
              Sign up to{" "}
              <span className="font-bold text-xl">
                Tisu Paseo Albion Helper
              </span>
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-register"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          type="email"
                          placeholder="Input email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Create a Password</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="password"
                          placeholder="Input password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                disabled={mutation.isPending}
                className="w-full"
                form="form-register"
                type="submit"
                loading={mutation.isPending}
              >
                Create Account
              </Button>
              <div className="flex justify-between items-center">
                <p>Already have an account? </p>
                <Link to="/login">
                  <Button variant="link">Sign In Here</Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
