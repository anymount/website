
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AgeVerificationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AgeVerificationDialog = ({ open, onConfirm, onCancel }: AgeVerificationDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-adult-dark border border-adult-purple text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-2xl">Verificação de Idade</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Este site contém conteúdo explícito destinado apenas a adultos. Para continuar, você deve confirmar que tem pelo menos 18 anos de idade.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onCancel}
            className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800"
          >
            Sair
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-adult-accent hover:bg-adult-magenta text-white"
          >
            Confirmo que tenho 18 anos ou mais
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationDialog;
