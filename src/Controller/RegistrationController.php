<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/inscription', name: 'inscription', methods: ['GET'])]
    public function displayHome(): Response
    {
        return $this->render('guest/registration.html.twig');
    }
}