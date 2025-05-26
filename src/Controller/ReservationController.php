<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ReservationController extends AbstractController
{
    #[Route('/reservation/{studioSlug}', name: 'reservation')]
    public function reserver(string $studioSlug)
    {
        // Tableau de correspondance slug -> nom studio (et potentiellement autres infos)
        $studios = [
            'red-house' => 'Red House',
            'blasta-studio' => 'Blasta studio',
            'gam-studio' => 'Gam Studio',
            'music-hall-source' => 'Music Hall Source',
            'qds-studios' => 'QDS studios',
            'urban-studio' => 'Urban studio',
        ];

        if (!array_key_exists($studioSlug, $studios)) {
            throw $this->createNotFoundException('Studio non trouvé.');
        }

        $studioName = $studios[$studioSlug];

        return $this->render('guest/reservation.html.twig', [
            'studioSlug' => $studioSlug,
            'studio' => $studioName,
        ]);
    }
}
