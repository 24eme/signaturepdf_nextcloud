<?php

declare(strict_types=1);

namespace OCA\SignaturePDF\Config;

use OCP\IConfig;
use Psr\Log\LoggerInterface;
use OCA\SignaturePDF\AppInfo\Application;

class Config {
	private IConfig $config;

	private LoggerInterface $logger;

	/**
	 * Config constructor.
	 */
	public function __construct(
		IConfig $config,
		LoggerInterface $logger,
	) {
		$this->config = $config;
		$this->logger = $logger;

		$this->setInstance('https://pdf.24eme.fr');
	}

	public function getInstance(): string {

		return $this->config->getAppValue(Application::APP_ID, 'instance');
	}

	public function setInstance($value) {
		$this->config->setAppValue(Application::APP_ID, 'instance', $value);
		$this->logger->info('Instance were updated!');
	}


}
