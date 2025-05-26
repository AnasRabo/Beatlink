<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConnectController extends AbstractController
{
    #[Route('/connexion', name: 'connexion', methods: ['GET'])]
    public function displayHome(): Response
    {
        return $this->render('guest/connect.html.twig');
    }
}