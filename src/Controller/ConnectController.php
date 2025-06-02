<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;  
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Inscription; // Ton entité utilisateur

class ConnectController extends AbstractController
{
    #[Route('/connexion', name: 'connexion', methods: ['GET', 'POST'])]
    public function displayHome(Request $request, EntityManagerInterface $em): Response
    {
        if ($request->isMethod('POST')) {
            $email = $request->request->get('email');
            $password = $request->request->get('password');

            $user = $em->getRepository(Inscription::class)->findOneBy(['email' => $email]);

            if ($user && password_verify($password, $user->getPassword())) {
                $session = $request->getSession();
                $session->set('user_id', $user->getId());
                $session->set('user_prenom', $user->getPrenom());

                $this->addFlash('success', 'Connexion réussie ! Bienvenue ' . $user->getPrenom());

                return $this->redirectToRoute('home');
            } else {
                $this->addFlash('error', 'Email ou mot de passe incorrect.');
            }
        }

        return $this->render('guest/connect.html.twig');
    }
}
