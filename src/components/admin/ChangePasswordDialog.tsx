
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ADMIN_PASSWORD_KEY = 'admin_password';

const ChangePasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    
    if (currentPassword !== storedPassword) {
      toast({
        title: "Erreur",
        description: "Le mot de passe actuel est incorrect.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le nouveau mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive"
      });
      return;
    }
    
    // Save new password
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    
    toast({
      title: "Succès",
      description: "Le mot de passe a été modifié avec succès.",
    });
    
    // Reset form and close dialog
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-adult-purple text-white">
          Changer le mot de passe
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border border-adult-purple border-opacity-20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Changer le mot de passe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Mot de passe actuel</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border-adult-purple bg-adult-dark/50 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nouveau mot de passe</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-adult-purple bg-adult-dark/50 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-adult-purple bg-adult-dark/50 text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              className="border-adult-purple text-white"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-adult-accent hover:bg-adult-magenta text-white">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
