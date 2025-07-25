import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useContactStore } from '../stores/contactStore';
import { ContactFormData } from '../lib/contactSchema';
//

interface UseContactMutationProps {
  setFormData: (data: ContactFormData) => void;
  setIsLoading: (loading: boolean) => void;
  setSuccessMessage?: (message: boolean) => void;
}

export const useContactMutation = ({
  setFormData,
  setIsLoading,
  setSuccessMessage
}: UseContactMutationProps) => {
     const { addSubmission, setHasSubmitted } = useContactStore();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      setIsLoading(true);

    

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send contact message');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (responseData) => {
      toast.success('Message sent successfully!');
      console.log('[Mutation] Success!:', responseData);
      if (setSuccessMessage) {
        setSuccessMessage(true);
      }
      addSubmission(responseData.data);
      if (responseData.success) {
         setHasSubmitted(true);
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('Error sending contact message:', error.message);
      } else {
        console.error('Unknown error sending contact message:', error);
      }
      toast.error('Failed to send message. Please try again.');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};
