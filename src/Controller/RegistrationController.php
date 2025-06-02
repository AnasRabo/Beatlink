<?php
// src/Controller/RegistrationController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;  
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Inscription;  
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
    #[Route('/inscription', name: 'inscription', methods: ['GET', 'POST'])]
    public function displayHome(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher): Response
    {
        if ($request->isMethod('POST')) {
            $nom = $request->request->get('nom');
            $prenom = $request->request->get('prénom');
            $email = $request->request->get('email');
            $password = $request->request->get('password');

            $inscription = new Inscription();
            $inscription->setNom($nom);
            $inscription->setPrenom($prenom);
            $inscription->setEmail($email);

            // Hachage du mot de passe (sécurité)
            $hashedPassword = $hasher->hashPassword($inscription, $password);
            $inscription->setPassword($hashedPassword);

            $em->persist($inscription);
            $em->flush();

            $this->addFlash('success', 'Inscription réussie, vous pouvez maintenant vous connecter.');
            return $this->redirectToRoute('connexion'); // Redirection vers la page de connexion
        }

        return $this->render('guest/Registration.html.twig');
    }
}
