<?php

namespace MyVendor\StoreInventory\Controller;

use MyVendor\StoreInventory\Domain\Repository\ProductRepository;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

/**
 * Class StoreInventoryController
 *
 * @package MyVendor\StoreInventory\Controller
 */
class StoreInventoryController extends ActionController
{

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * Inject the product repository
     *
     * @param \MyVendor\StoreInventory\Domain\Repository\ProductRepository $productRepository
     */
    public function injectProductRepository(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * List Action
     *
     * @return void
     */
    public function listAction()
    {
        $products = $this->productRepository->findAll();
        $this->view->assign('products', $products);
    }
}
