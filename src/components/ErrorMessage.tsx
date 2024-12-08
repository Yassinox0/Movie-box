interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-center p-4 bg-red-500 bg-opacity-10 rounded-lg">
      <p className="text-red-500">{message}</p>
    </div>
  );
}