export default function AuthFormError({ state }: { state: { error: string } }) {
  if (state.error)
    return (
      <div className="bg-destructive text-destructive-foreground my-4 w-full p-4 text-xs">
        <h3 className="font-bold">Error</h3>
        <p>{state.error}</p>
      </div>
    );
  return null;
}
