export type Page<T = {}> = React.FC<{
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
}>;
