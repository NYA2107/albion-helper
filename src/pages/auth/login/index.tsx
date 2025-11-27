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
import useLoginMutation from "./hooks/useLoginMutation";
import { LoginFormSchema, type LoginType } from "./schema";

const Login = () => {
  const mutation = useLoginMutation();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;

  const handleSubmit = (data: LoginType) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="sm:min-w-[375px]">
        <CardHeader>
          <CardTitle>
            <Link to="/">
              <Button className="p-0! mb-3" variant="link">
                <ArrowLeft />
                <span>Home</span>
              </Button>
            </Link>
            <h2 className="text-3xl">Login</h2>
            <h2 className="text-sm text-primary font-normal">
              Sign in to{" "}
              <span className="font-bold text-xl">
                Tisu Paseo Albion Helper
              </span>
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-login"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="current-password"
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
                form="form-login"
                type="submit"
                loading={mutation.isPending}
              >
                Login
              </Button>
              <div className="flex justify-between items-center">
                <p>Don't have an account? </p>
                <Link to="/register">
                  <Button variant="link">Sign Up Here</Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
